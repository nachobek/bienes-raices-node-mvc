const isSeller = (userId, propertyUserId) => {
    return userId === propertyUserId 
}

const formatDate = (date) => {
    const dateOnly = new Date(date).toISOString().slice(0, 10);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Date(dateOnly).toLocaleDateString('en-US', options)
}

export {
    isSeller,
    formatDate
}