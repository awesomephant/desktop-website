var peopleData;
var listTemplate = Handlebars.compile('<ul class="people-list"><li class="people-list--item people-list--header"><span class="people-list--index">#</span><span id="js-sortByName" class="people-list--name">Name</span><span id="js-sortByCourse"class="people-list--course">Course</span></li>{{#each people}}<li class="people-list--item people-list--person" data-index="{{@index}}"><span class="people-list--index">{{@index}}</span><span class="people-list--name">{{this.Name}}</span><span class="people-list--course">{{this.Course}}</span></a></li>{{/each}}</ul>')

var sortAlphabetically = function (el, property) {
    var order = el.getAttribute('data-order')
    if (order === null) { order = 'desc' }
    else if (order === 'asc') { order = 'desc'; }
    else if (order === 'desc') { order = 'asc'; }
    console.log(order);
    peopleData.people.sort(function (a, b) {
        var nameA = a[property].toLowerCase(), nameB = b[property].toLowerCase();
        if (order === 'asc') {
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
        }
        else if (order === 'desc') {
            if (nameA < nameB) { return 1; }
            if (nameA > nameB) { return -1; }
        }
        return 0; //default return value (no sorting)
    })
    el.setAttribute('data-order', order)
    var html = listTemplate(peopleData)
    updateWindow(el, html, initPeopleList)
}

var initPeopleList = function (el) {
    var people = el.querySelectorAll('.people-list--person')
    var sortByNameButton = el.querySelector("#js-sortByName");
    var sortByCourseButton = el.querySelector("#js-sortByCourse");
    sortByNameButton.addEventListener("click", function () { sortAlphabetically(el, 'Name') })
    sortByCourseButton.addEventListener("click", function () { sortAlphabetically(el, 'Course') })
    for (var i = 0; i < people.length; i++) {
        var link = people[i];
        link.addEventListener('click', function () {
            var index = this.getAttribute('data-index');
            var person = peopleData.people[index];
            person.title = person['Show Piece Title']
            person.imageCount = person.ImageCount * 1;
            person.images = [];
            for (var i = 0; i < person.imageCount; i++) {
                person.images.push('./assets/work/' + person.Name.toLowerCase().replace(/ /g, '') + '-' + i + '.jpg')
            }
            console.log(person)
            var personTemplate = Handlebars.compile('{{#if title}}<h2>{{title}}</h2>{{/if}}{{#if description}}<p>{{description}}</p>{{/if}}{{#each images}}<img src="{{this}}"/>{{/each}}{{#if Website}}<a class="window-button" href="{{Website}}">Website</a>{{/if}}{{#if Instagram}}<a class="window-button" href="http://www.instagram.com/{{Instagram}}">Instagram</a>{{/if}}{{#if Twitter}}<a class="window-button" href="http://www.twitter.com/{{Twitter}}">Twitter</a>{{/if}}')
            var html = personTemplate(person);
            spawnWindow({
                title: person.Name,
                content: html,
                x: 500,
                y: 300,
                width: 350,
                height: 300
            })
        })
    }
}
var spawnPeopleWindow = function () {
    var html = listTemplate(peopleData);
    spawnWindow({
        title: 'People',
        content: html,
        x: 688,
        y: 70,
        width: 330,
        height: 275,
        init: initPeopleList
    })
}

fetch('../data/people.json').then(function (response) {
    return response.json();
}).then(function (data) {
    peopleData = data;
    spawnPeopleWindow();
});