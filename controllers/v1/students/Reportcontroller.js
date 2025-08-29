
const db = require('../../../models/index'); // Path to your db file // Use models in your queries or associations here
const Studentmodel = db.Studentmodel; // Access studentSubmodel
const Subjectmodel = db.Subjectmodel; 
const Markmodel = db.Markmodel; 

const { exportDataToExcel } = require('../../../controllers/v1/controller');

// router.get('/download', async (req, res) => {
   
// });

const listReport = async (req, res) => { 
    try {
        const students = await Studentmodel.findAll({
            include: [
                {
                    model: Markmodel,
                    include: [Subjectmodel], // Include subject information
                },
            ],
        });
        await exportDataToExcel(students, res);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error exporting data");
    }
};

module.exports = {listReport};