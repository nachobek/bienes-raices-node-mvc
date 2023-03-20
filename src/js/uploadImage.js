import { Dropzone } from 'dropzone';


const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

Dropzone.options.uploadImage = {
    dictDefaultMessage: 'Drop your images or click here to upload',
    acceptedFiles: '.png, .jpg, .jpeg, .bmp, .tiff, .tif',
    maxFileSize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    headers: {
        'CSRF-Token': csrfToken
    },
    paramName: 'image',
    init: function() {
        const dropzone = this;

        const btnPublish = document.querySelector('#publish');

        btnPublish.addEventListener('click', function() {
            dropzone.processQueue();
        });

        // At this point, this JS file takes over the backend code. So we perform the redirect action from here.
        dropzone.on('queuecomplete', function() {
            if(dropzone.getActiveFiles().length == 0) {
                window.location.href = '/my-properties';
            }
        });
    }
}