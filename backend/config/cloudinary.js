const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const registrationStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.fieldname === 'registrationProof') {
            return {
                folder: 'kcwinners/registration-proofs', 
                allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
            }
        }

    }
});

const contributionStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.fieldname === 'contributionReceipt') {
            return {
                folder: 'kcwinners/contribution', 
                allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
            }
        }

    }
});

const clearanceStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.fieldname === 'registrationProof') {
            return {
                folder: 'kcwinners/clearance-proofs', 
                allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
            }
        }

    }
});


const uploadRegistrationProof = multer({ storage: registrationStorage })
const uploadContributionProof = multer({ storage: contributionStorage })
const uploadClearanceProof = multer({ storage: clearanceStorage })

module.exports = {
    uploadRegistrationProof,
    uploadContributionProof,
    uploadClearanceProof
};