const dummy = (blogs) => {
    return 1;
};

const totalLikes = blogs => blogs.reduce((acc, i) => acc + i.likes, 0);
const favoriteBlog = blogs => blogs.length > 0 ? blogs.reduce((acc, i) => acc.likes > i.likes ? acc : i) : 0; 

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}