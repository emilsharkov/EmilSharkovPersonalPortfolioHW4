const fetchBlogs = () => {
    let blogs = JSON.parse(localStorage.getItem('blogs'))
    blogs.forEach(blog => renderBlogPost(blog,false))
}

const bindAddBlogDialog = () => {
    const addButton = document.getElementById('add')
    const blogDialog = document.getElementById('blog-dialog')
    const title = blogDialog.querySelector('#blog-title-input')
    const date = blogDialog.querySelector('#blog-date-input')
    const textarea = document.querySelector('textarea')
    const save = document.getElementById('save')

    addButton.addEventListener('click', () => {
        blogDialog.showModal();
    });

    save.addEventListener('click', () => {
        let newBlog = {
            title: title.value,
            date: date.value,
            summary: textarea.value
        }
        renderBlogPost(newBlog, true)
    });
}

const renderBlogPost = (newBlog, isNew) => {
    const blogContainer = document.getElementById('blog-container')
    let uuid = -1
    if(isNew) {
        uuid = Date.now()
        newBlog.uuid = uuid
        let blogs = JSON.parse(localStorage.getItem('blogs'))
        blogs.push(newBlog)
        localStorage.setItem('blogs',JSON.stringify(blogs))
    } else {
        uuid = newBlog.uuid
    }

    let blogEntry = document.createElement('div')
    blogContainer.appendChild(blogEntry)
    blogEntry.id = `blog-entry-${uuid}`
    blogEntry.innerHTML = `
        <h3 id='title-${uuid}'>${newBlog.title}</h3>
        <h5 id='date-${uuid}'>${newBlog.date}</h5>
        <p id='summary-${uuid}'>${newBlog.summary}</p>
        <div>
            <button id='edit-${uuid}'>Edit</button>
            <button id='delete-${uuid}'>Delete</button>
        </div>
    `

    const editButton = document.getElementById('edit-' + uuid)
    generateEditDialog(uuid)
    const editDialog = document.getElementById('edit-dialog-' + uuid)
    editButton.addEventListener('click', () => {
        editDialog.showModal()
    })

    const deleteButton = document.getElementById('delete-' + uuid)
    deleteButton.addEventListener('click', () => {
        deleteBlogPost(uuid)
    })
}

const deleteBlogPost = (uuid) => {
    let blogs = JSON.parse(localStorage.getItem('blogs'))
    let index = -1
    for (let i = 0; i < blogs.length; i++) {
        if(blogs[i].uuid === uuid){
            index = i
        }
    }
    blogs.splice(index,1)
    localStorage.setItem('blogs',JSON.stringify(blogs))

    const blog = document.getElementById('blog-entry-' + uuid)
    blog.remove()
}

const generateEditDialog = (uuid) => {
    let editDialog = document.createElement('dialog')
    editDialog.id = 'edit-dialog-' + uuid
    document.body.appendChild(editDialog)

    editDialog.innerHTML = `
        <form method='dialog'>
            <label>Post Title</label>
            <input type='text' id='blog-title-input-edit-${uuid}'/>
            <label>Post Date</label>
            <input type='date' id='blog-date-input-edit-${uuid}'/>
            <label>Post Summary</label>
            <textarea id='textarea-edit-${uuid}'></textarea>
            <div>
                <button id='save-edit-${uuid}'>Save</button>
                <button value='cancel'>Cancel</button>
            </div>
        </form>
    `

    const editedTitle = editDialog.querySelector('#blog-title-input-edit-' + uuid)
    const editedDate = editDialog.querySelector('#blog-date-input-edit-' + uuid)
    const editedTextarea = editDialog.querySelector('#textarea-edit-' + uuid)
    const editedSave = document.getElementById('save-edit-' + uuid)

    editedSave.addEventListener('click', () => {
        let editedBlog = {
            title: editedTitle.value,
            date: editedDate.value,
            summary: editedTextarea.value,
            uuid: uuid
        }

        let blogs = JSON.parse(localStorage.getItem('blogs'))
        let index = -1
        for (let i = 0; i < blogs.length; i++) {
            if(blogs[i].uuid === uuid){
                index = i
            }
        }
        blogs[index] = editedBlog
        localStorage.setItem('blogs',JSON.stringify(blogs))
        
        const updatingTitle = document.getElementById('title-' + uuid)
        const updatingDate = document.getElementById('date-' + uuid)
        const updatingSummary = document.getElementById('summary-' + uuid)

        updatingTitle.innerHTML = editedBlog.title
        updatingDate.innerHTML = editedBlog.date
        updatingSummary.innerHTML = editedBlog.summary
    });    
}

export { bindAddBlogDialog, fetchBlogs }