const Topic = require('../models/topic')

exports.getTopics =  async (query) => {
    try {
        const topics = await Topic.find(query);
        return topics
    } catch (e) {
        throw Error(e)
    }
}


exports.createTopic = async (data) => {
    try {        
        const topic = new Topic({
            ...data
        });
        await topic.save()
        return topic
    } catch (e) {
        throw Error(e)
    }
}


