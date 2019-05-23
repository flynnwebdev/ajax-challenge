function renderTweet(tweet) {
    document.querySelector('#tweets').innerHTML += `
                <div class="tweet" data-id="${tweet.id}">
                    <p>
                        ${tweet.message}
                        <button onclick="delete_tweet(${tweet.id})">Delete</button>
                    </p>
                </div>
    `
}

function delete_tweet(tweetid) {
    $.ajax({
        url: `http://localhost:3000/tweets/${tweetid}`,
        type: 'delete',
        complete: () => {
            document.querySelector(`.tweet[data-id="${tweetid}"]`).remove()
        }
    })
}

fetch('http://localhost:3000/tweets.json')
    .then(response => response.json())
    .then(tweets => {
        for (let tweet of tweets) {
            renderTweet(tweet)
        }
    })

document.querySelector('#new_tweet')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        let content = e.target[0].value //document.querySelector('#content').value
        $.post('http://localhost:3000/tweets.json', {
            tweet: {
                message: content
            }
        }, (res) => renderTweet(res))
    })