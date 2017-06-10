var peopleData;

var sortByName = function (el) {
    peopleData.people.sort(function (a, b) {
        var nameA = a.Name.toLowerCase(), nameB = b.Name.toLowerCase();
        if (nameA < nameB) //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0; //default return value (no sorting)
    })

    for (var i = 0; i < peopleData.people.length; i++) {
        let p = peopleData.people[i];
        console.log(p.Name)
    }
}

var initPeopleList = function (el) {
    var people = el.querySelectorAll('.people-list--person')
    var sortByNameButton = el.querySelector("#js-sortByName");
    var sortByCourseButton = el.querySelector("#js-sortByCourse");
    sortByNameButton.addEventListener("click", function () { sortByName(el) })
    //    sortByCourseButton.addEventListener("click", sortByCourse)
    for (var i = 0; i < people.length; i++) {
        var link = people[i];
        link.addEventListener('click', function () {
            var index = this.getAttribute('data-index');
            var person = peopleData.people[index];
            var personTemplate = Handlebars.compile('{{#if Website}}<a class="window-button" href="{{Website}}">Website</a>{{/if}}{{#if Instagram}}<a class="window-button" href="http://www.instagram.com/{{Instagram}}">Instagram</a>{{/if}}{{#if Twitter}}<a class="window-button" href="http://www.twitter.com/{{Twitter}}">Twitter</a>{{/if}}')
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
    var listTemplate = Handlebars.compile('<ul class="people-list"><li class="people-list--item people-list--header"><span class="people-list--index">#</span><span id="js-sortByName" class="people-list--name">Name</span><span id="js-sortByCourse"class="people-list--course">Course</span></li>{{#each people}}<li class="people-list--item people-list--person" data-index="{{@index}}"><span class="people-list--index">{{@index}}</span><span class="people-list--name">{{this.Name}}</span><span class="people-list--course">{{this.Course}}</span></a></li>{{/each}}</ul>')
    var html = listTemplate(peopleData);
    spawnWindow({
        title: 'People',
        content: html,
        x: 100,
        y: 100,
        width: 350,
        height: 500,
        init: initPeopleList
    })
}

fetch('../data/people.json').then(function (response) {
    return response.json();
}).then(function (data) {
    peopleData = data;
    spawnPeopleWindow();
});