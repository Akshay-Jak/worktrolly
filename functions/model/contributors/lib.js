/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

exports.getContributors = function() {
    const query = db.collection("Contributors");

    const promise = query.get().then((docs) => {
        const contributors = [];
        docs.forEach((element) => {
            if (element.exists) {
                contributors.push(element.data());
            }
        });
        return contributors;
    });

    return Promise.resolve(promise);
};

exports.setContributors = function(docId, email, about, photoUrl, title, name) {
    console.log(about);
    const P1 = db.collection("Contributors").doc(docId).set({
        Email: email,
        About: about,
        PhotoUrl: photoUrl,
        Title: title,
        Name: name,
        ContributorId: docId,
    });
    return Promise.resolve(P1);
};