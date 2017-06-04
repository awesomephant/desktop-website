var listTemplate = Handlebars.compile('<ul class="people-list">{{#each people}}<li><a href="#1" class="people-list--person">{{this.Name}}</a></li>{{/each}}</ul>')

var initPeopleList = function (el) {
    var people = el.querySelectorAll('.people-list--person')
    for (var i = 0; i < people.length; i++) {
        var link = people[i];
        link.addEventListener('click', function () {
            console.log('yoyoyoy')
            spawnWindow({
                title: 'Person',
                content: 'This is a person',
                x: 500,
                y: 300,
                width: 150,
                height: 200
            })
        })
    }
}

fetch('../data/people.json').then(function (response) {
    return response.json();
}).then(function (data) {
    var html = listTemplate(data);
    spawnWindow({
        title: 'People',
        content: html,
        x: 100,
        y: 100,
        width: 350,
        height: 500,
        init: initPeopleList
    })

});