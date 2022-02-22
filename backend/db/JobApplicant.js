const Sequelize = require("sequelize")
const {DataTypes} =require("sequelize")
const sequelize = new Sequelize("jobportal", "postgres", "harshil", {
    host: "localhost",
    port: 5432,
    dialect: 'postgres',
    logging: false,


})


const JobApplicant = sequelize.define('applicant',
    {

        aid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNuzll: false,

        },
        skills: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            allowNull: true,



        },
        resume: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        profile: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        education: {
            type: Sequelize.ARRAY(DataTypes.JSON),
            allowNull: true,
            validate: {
                validator: function (value) {
                    // var values = (Array.isArray(value)) ? value : [value];
                    value.forEach((obj) => {
                        if (!Number.isInteger(obj.startYear) ) {
                            throw new Error('Start Year should be an integer')
                        }
                        if (!Number.isInteger(obj.endYear)) {
                            throw new Error('End Year should be an integer')
                        }
                        if (obj.endYear <= obj.startYear) {
                            throw new Error('End year should be greater than or equal to Start year')
                        }

                    })
                    return value
                }
            }
        }
    }, {

    timestamps: false
}
)
JobApplicant.sync().then(() => console.log('Table Job Applicant Created'))
module.exports = JobApplicant