const { Schema, model } = require('mongoose');

const defaultChannels =     [
    { name: 'Ch: 1 - Gameshows80', list: ['PLuKKJ5FR6_i-G3X2qR9kJ6TRri07AKsJe'], episodes: 194, randPoint: 0 },
    { name: 'Ch: 2 - Classic Gameshows', list: ['PLMK_6ky6NNPquQ8vAnN-qCIoHdW1lwpRq'], episodes: 200, randPoint: 0 },
    { name: 'Ch: 3 - Price Is Right', list: ['PL8qCHhbAE4pOUkwTUoGISIfrFNO9uXFk5', 'PL8qCHhbAE4pOUkwTUoGISIfrFNO9uXFk5'], episodes: 200, randPoint: 0 },
    { name: "Ch: 4 - Cartoons Forever", list: ['PLhNec9tcvCfBir8KQxopOdDGxTMsXtj3Z', 'PLo6LMGdjaTzI76fH66OWjpBJw0cleQGC6'], episodes: 200, randPoint: 0 },
    { name: 'Ch: 5 - Toonami Swim', list: ['PLo6LMGdjaTzIQMz6eUB-Y74F87PRvvi_q'], episodes: 8, randPoint: 1 },
    { name: 'Ch: 6 - Saturday Morning', list: ['PLo6LMGdjaTzIaer3XW-Hw9zalxpnFBPS7'], episodes: 17, randPoint: 1 },
    { name: 'Ch: 7 - Recess', list: ['PL3panSrIeiNJZN_qyGZvhvtI4R-xKsEW8'], episodes: 135, randPoint: 0 },
    { name: 'Ch: 8 - Reading Rainbow', list: ['PLx17EcnKQ9UYoxPfxb9C_K4S9V26Z3xxj'], episodes: 151, randPoint: 0 },
    { name: "Ch: 9 - Computerphile", list: ['PLo6LMGdjaTzLKMVX0XpRnBC5lsB0tdW1L'], episodes: 199, randPoint: 0 },
    {name: 'Ch: 10 - Computer Chronicles', list: ['PLmM8tWTshxQBws_fIdi5qH63rZxrlB0qL', 'PLo6LMGdjaTzJ-1c0eMes7t3kqDaJARw0S','PLo6LMGdjaTzKTYLTLmaF3rhlQpPaqC6jd'], episodes: 200, randPoint: 0},
    { name: 'Ch: 11 - TechTV', list: ['PLo6LMGdjaTzKuVaftTtnSPfMOOlFhORm8'], episodes: 1, randPoint: 1 },
    { name: 'Ch: 12 - Xplay', list: ['PLKE9oP_rYnRdLhG3HW__6ytTwvgSBM9pu', 'PLo6LMGdjaTzLBjKmMxHWuTWwXleScacyA'], episodes: 150, randPoint: 0 },
    { name: 'Ch: 13 - MTV', list: ['PLId5xJ_xHV-k3ZgNju2ifMLct7-8uRKr8'], episodes: 200, randPoint: 0 },
    { name: 'Ch: 14 - MST 3000', list: ['PLDXsAHvr3XNPn8PfqYpU7NBHWOzdow89l'], episodes: 177, randPoint: 0 },
    { name: "Ch: 15 - 90's B-Movies", list: ['PLKxdKKLx3iRTyfWK8SQghHUGHfOTGhRl2'], episodes: 200, randPoint: 0 },
    { name: "Ch: 16 - 80's B-Movies", list: ['PLKxdKKLx3iRQbB2m8NkfX6e-PwMvNI-Wl'], episodes: 200, randPoint: 0 },
    { name: "Ch: 17 - Vintage Movies", list: ['PLyMSG-Q0Oh8cr6AG1jbptCGW5P6n-_Szz'], episodes: 129, randPoint: 0 },
    { name: 'Ch: 18 - Scifi Movies', list: ['PLo6LMGdjaTzJ8y8OBialU_RVhIXg8HpLe'], episodes: 73, randPoint: 0 },
    { name: "Ch: 19 - Horror/SciFi Movies", list: ['PL2e8s2GMT08wtackx9qxf_cJZsTxVy0yL'], episodes: 200, randPoint: 0 },
    { name: "Ch: 20 - NFL 80s", list: ['PLAr_WbjGaCm5laqRScaYFlNiDSrLLW4rn'], episodes: 200, randPoint: 0 },
    { name: "Ch: 21 - Vintage TV", list: ['PLVPqan6x_34F-M2lCiaTzRSX6jxyQbXcL'], episodes: 200, randPoint: 0 },
    {name: "Ch: 22 - Not Programmed",list: ["PLchOdr3NN1n3NZpeBRG-eukGB6Lo2HgY4"],episodes: 1,randomPoint: null,},
    {name: "Ch: 23 - Not Programmed",list: ["PLchOdr3NN1n3NZpeBRG-eukGB6Lo2HgY4"],episodes: 1,randomPoint: null,},
    {name: "Ch: 24 - Not Programmed",list: ["PLchOdr3NN1n3NZpeBRG-eukGB6Lo2HgY4"],episodes: 1,randomPoint: null,},
    {name: "Ch: 25 - Not Programmed",list: ["PLchOdr3NN1n3NZpeBRG-eukGB6Lo2HgY4"],episodes: 1,randomPoint: null,},
    {name: "Ch: 26 - Not Programmed",list: ["PLchOdr3NN1n3NZpeBRG-eukGB6Lo2HgY4"],episodes: 1,randomPoint: null,},
    {name: "Ch: 27 - Not Programmed",list: ["PLchOdr3NN1n3NZpeBRG-eukGB6Lo2HgY4"],episodes: 1,randomPoint: null,},
    {name: "Ch: 28 - Not Programmed",list: ["PLchOdr3NN1n3NZpeBRG-eukGB6Lo2HgY4"],episodes: 1,randomPoint: null,},
    {name: "Ch: 29 - Not Programmed",list: ["PLchOdr3NN1n3NZpeBRG-eukGB6Lo2HgY4"],episodes: 1,randomPoint: null,},
    {name: "Ch: 30 - Not Programmed",list: ["PLchOdr3NN1n3NZpeBRG-eukGB6Lo2HgY4"],episodes: 1,randomPoint: null,},
];

const statsSchema = new Schema({
    maxCh: {
        type: Number,
        default: 20
    },
    currentCh: {
        type: Number,
        default: 0
    },
    volume: {
        type: Number,
        default: 100
    },
    horShift: {
        type: Number,
        default: 0
    },
    vertShift: {
        type: Number,
        default: 0
    },
    horSize: {
        type: Number
        ,
        default: 1
    },
    vertSize: {
        type: Number,
        default: 1
    },
    watched:{
        type: Array,
        default: [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]
    },
    channels: {
        type: Array,
        default: defaultChannels
    }
})

module.exports = statsSchema;