const mentorModel = require("../models/mentor");
const statusCodes = require("http-status-codes");

const get = async (req, res) => {
    let page = 1, limit = 20;

    if (req.query.page && parseInt(req.query.page) > 0) {
        page = parseInt(req.query.page);
    }

    const results = await mentorModel.get({}, [], page, limit);
    const total = await mentorModel.getTotalCount({}, [], page, limit);
    return res.send({
        data: results,
        total: total
    })
};

const detail = async (req, res) => {
    const id = req.params.id;
    const results = await mentorModel.get({mentorId: id}, [], 1, 1);
    return res.send({
        data: results[0]
    })
};

const remove = async (req, res) => {
    const id = req.params.id;
    const result = await mentorModel.remove({mentorId: id});
    return res.status(statusCodes.OK).json({
        status: result,
        message: result ? "Success" : "Mentor not exists"
    });
};

const detailBatch = (req, res) => {
    mentorModel.detailBatch(req.params.id, (response) => {
        res.send(response);
    });
};


const create = (req, res) => {
    const {
        fullNameMentor,
        dayOfBirth,
        gender,
        address,
        workplace,
        email,
        postion,
        idDG,
        idInternshipCourse,
    } = req.body;
    if (
        !fullNameMentor ||
        !dayOfBirth ||
        !address ||
        !gender ||
        !workplace ||
        !email ||
        !postion ||
        !idDG ||
        !idInternshipCourse
    ) {
        return res
            .status(statusCodes.BAD_REQUEST)
            .json({message: "Please enter information"});
    }
    if (fullNameMentor.length < 5 || fullNameMentor.length > 255) {
        return res
            .status(statusCodes.BAD_REQUEST)
            .json({message: "Your name has exceeded the allowed limit !!!"});
    }

    mentorModel.create(
        {
            fullNameMentor,
            dayOfBirth,
            gender,
            address,
            workplace,
            email,
            postion,
            idDG,
            idInternshipCourse,
        },
        (response) => {
            res.status(statusCodes.OK).json({message: "Cretae successfully"});
        }
    );
};
const update = (req, res) => {
    const {
        idMentor,
        fullNameMentor,
        dayOfBirth,
        gender,
        address,
        workplace,
        email,
        postion,
        idDG,
        idInternshipCourse,
    } = req.body;
    if (
        !fullNameMentor ||
        !dayOfBirth ||
        !address ||
        !gender ||
        !workplace ||
        !email ||
        !postion ||
        !idDG ||
        !idInternshipCourse
    ) {
        return res
            .status(statusCodes.BAD_REQUEST)
            .json({message: "Please enter information"});
    }
    if (fullNameMentor.length < 5 || fullNameMentor.length > 255) {
        return res
            .status(statusCodes.BAD_REQUEST)
            .json({message: "Your name has exceeded the allowed limit !!!"});
    }
    mentorModel.update(
        {
            idMentor,
            fullNameMentor,
            dayOfBirth,
            gender,
            address,
            workplace,
            email,
            postion,
            idDG,
            idInternshipCourse,
        },
        (response) => {
            res.status(statusCodes.OK).json(response);
        }
    );
};
// const update = (req, res) => {
//   const id = req.body;
//   mentorModel.update(id, (response) => {
//     res.send({ result: response });
//   });
// };
module.exports = {get, detailBatch, detail, update, create, remove};
