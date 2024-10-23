//This component is to create dummy data when the app is first loaded. It is not necessary to use this component in the final version of the app. It is only used to create dummy data for testing purposes.
//The data source is the data/courseData.js and data/adminData.js files.

export default function createDummyData() {
    //Load the data in the source file.
    const courseData = require('../data/courseData').default;
    const adminData = require('../data/adminData').default;

    //Check if the data already exists in the local storage.
    if (!localStorage.getItem('courses')) {
        localStorage.setItem('courses', JSON.stringify(courseData));
    }

    const userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];

    //find if the id already exists in the userCredentials.
    const admin = userCredentials.find((user) => user.userId === adminData[0].adminId);

    if (!admin) {
        //prepare the data and store it in the local storage.
        const data = {
            userId: adminData[0]?.adminId,
            username: adminData[0]?.username,
            password: adminData[0]?.password,
            role: adminData[0]?.role,
        };

        userCredentials.push(data);
        localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
    }
}
