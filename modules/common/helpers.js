module.exports = {
    contentPath(prefix, index) {
        return `${prefix}/content/chaps.${index}.html`;
    },
    storyPath(prefix) {
        return `${prefix}/info.json`
    }
};
