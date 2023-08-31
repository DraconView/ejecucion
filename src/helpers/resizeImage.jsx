export const resizeImage = (image) => {
    return new Promise((resolve, reject) => {
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        const MIME_TYPE = "image/jpeg";
        const QUALITY = 0.8;

        const blobURL = image;
        const img = new Image();
        img.src = blobURL;
        img.onerror = function () {
            URL.revokeObjectURL(this.src);
            // Handle the failure properly
            //console.log("No se puede cargar la imagen");
        };

        img.onload = function () {
            URL.revokeObjectURL(this.src);
            const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            canvas.toBlob(
                (blob) => {
                    resolve(blob);
                },
                MIME_TYPE,
                QUALITY
            );
        };
    })

    function calculateSize(img, maxWidth, maxHeight) {
        let width = img.width;
        let height = img.height;
        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
            }
        }
        return [width, height];
    }
}