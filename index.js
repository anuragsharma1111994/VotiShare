const dropZone = document.querySelector('.drop-zone')
const fileInput = document.querySelector('#fileinput')
const browseBtn = document.querySelector('.browseBtn')


const baseURL = "https://innshare.herokuapp.com";
const uploadURL = `${baseURL}/api/files`;
// const emailURL = `${baseURL}/api/files/send`;

dropZone.addEventListener('dragover',(e)=>{
    e.preventDefault()

    if (!dropZone.classList.contains('dragged')) {
        dropZone.classList.add('dragged')
    }

})

dropZone.addEventListener('dragleave',()=>{
    dropZone.classList.remove('dragged')
})

dropZone.addEventListener('drop',(e)=>{
    e.preventDefault()
    dropZone.classList.remove('dragged')
    const files = e.dataTransfer.files 
    console.log(files)
    if (files.length) {
        fileInput.files = files
        uploadFiles()
    }
})

fileInput.addEventListener('change',()=>{
    uploadFiles()
})

browseBtn.addEventListener("click",(e)=>{
    fileInput.click() 
})

const uploadFiles = () =>{

    const file = fileInput.files[0]
    const formData = new FormData()
    formData.append("myfile",file)


    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        // console.log(xhr.readyState)
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response)
        }
    }

    xhr.upload.onprogress = updateProgress; 

    xhr.open('POST',uploadURL)
    xhr.send(formData)
}

const updateProgress = (e)=>{

    const persent =Math.round((e.loaded / e.total)*100)
    
    // console.log(e)
    console.log(persent)
}