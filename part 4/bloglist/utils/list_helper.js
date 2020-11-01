const dummy = (blogs) => {
    return 1;
};

const totalLikes = blogs => blogs.reduce((acc, i) => acc + i.likes, 0);
const favoriteBlog = blogs => blogs.length > 0 ? blogs.reduce((acc, i) => acc.likes > i.likes ? acc : i) : 0; 

const mostBlogs = blogs => {
    let counted = {};
    if (blogs.length === 0) {
        return {};
    };
    blogs.map(i => {
        if (counted[i.author] === undefined) {
            counted[i.author] = 1;
        } else {
            counted[i.author]++;
        }
    });
    let sorted = Object.entries(counted).sort((a, b) => b[1] - a[1]);
    return {
        'author': sorted[0][0],
        'blogs': sorted[0][1]
    };
};

const mostLikes = blogs => {
    let counted = {};
    if (blogs.length === 0) {
        return {};
    };
    blogs.map(i => {
        if (counted[i.author] === undefined) {
            counted[i.author] = i.likes;
        } else {
            counted[i.author] += i.likes;
        };
    });
    let sorted = Object.entries(counted).sort((a, b) => b[1] - a[1]);
    return {
        'author': sorted[0][0],
        'likes': sorted[0][1]
    };   
};


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}