/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
const { getOrgUseAppKey } = require("../../organization/lib");
const { getMyOrgCollectionDoc } = require("../lib");

exports.getMyOrgCollectionDocs = function(request, response) {
    const uid = request.body.data.Uid;
    const orgAppKey = request.body.data.OrgAppKey;

    let status = 200;

    getOrgUseAppKey(orgAppKey).then((data) => {
        const orgDomain = data.OrganizationDomain;

        console.log(orgDomain);
        console.log(uid);

        getMyOrgCollectionDoc(uid, orgDomain).then((orgDoc)=>{
            result = { data: {status: "Ok", data: orgDoc} };
            return response.status(status).send(result);
        }).catch((err) => {
            status = 500;
            console.error(err);
            return response.status(status).send(err);
        });
    }).catch((err) => {
        status = 500;
        console.error(err);
        return response.status(status).send(err);
    });
};