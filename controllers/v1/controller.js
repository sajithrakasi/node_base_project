const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const exportDataToExcel = async (students, res) => {
    const exportDir = path.join(__dirname, '../exports');

    // Ensure the exports directory exists
    if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir);
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Student Marks');

    // Define the column headers for the Excel sheet
    worksheet.columns = [
        { header: 'Student ID', key: 'studentId', width: 10 },
        { header: 'Student Name', key: 'name', width: 20 },
        { header: 'Age', key: 'age', width: 10 },
        { header: 'Class', key: 'class', width: 10 },
        { header: 'Subject Name', key: 'subjectName', width: 20 },
        { header: 'Marks', key: 'marks', width: 10 },
        { header: 'Total Marks', key: 'totalMarks', width: 15 }, // New total marks column
    ];

    // Iterate through the students and their marks, adding them to the worksheet
    students.forEach(student => {
        let totalMarks = 0; // Initialize total marks for the student

        if (student.studentmarks) {
            student.studentmarks.forEach(mark => {
                totalMarks += mark.marks; // Accumulate marks

                worksheet.addRow({
                    studentId: student.id,
                    name: student.name,
                    age: student.age,
                    class: student.class,
                    subjectName: mark.subject.name,
                    marks: mark.marks,
                    // totalMarks: totalMarks
                    // Add total marks to the row
                });
            });

            // Optionally, you can add a summary row after each student's marks
            worksheet.addRow({
                totalMarks: totalMarks // Display total marks
            });
        }
    });

    // Save the file to the file system
    const timestamp = Date.now();
    const exportPath = path.join(exportDir, `student_marks_${timestamp}.xlsx`);

    try {
        await workbook.xlsx.writeFile(exportPath);
        console.log(`File saved successfully at: ${exportPath}`);

        // Send the file as a response for download
        res.download(exportPath, `student_marks_${timestamp}.xlsx`, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Error downloading file');
            } else {
                console.log('File download initiated successfully.');
            }
        });
    } catch (error) {
        console.error('Error writing Excel file:', error);
        res.status(500).send('Error exporting data');
    }
};

module.exports = { exportDataToExcel };
