const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((acc, i) => acc + i.likes, 0);
}

module.exports = {
    dummy,
    totalLikes
}