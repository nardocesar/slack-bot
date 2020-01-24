const axios = require('axios');

const getTop10Gyms = () => {
    return axios.get('http://5e29b05592edd600140ddf6c.mockapi.io/api/v1/topvisits/3')
        .then(data => data.data);
};

const getBooking = () => {
    return axios.get('http://5e29b05592edd600140ddf6c.mockapi.io/api/v1/bookings/1')
    .then(data => data.data);
}

const getGymInfo = () => {
    return axios.get('http://5e29b05592edd600140ddf6c.mockapi.io/api/v1/gym_info/1')
    .then(data => data.data);
}

module.exports = {
    getTop10Gyms,
    getBooking,
    getGymInfo
}