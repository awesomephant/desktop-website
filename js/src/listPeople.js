var listTemplate = Handlebars.compile('<ul class="people-list">{{#each people}}<li>{{this.Name}}</li>{{/each}}</ul>')


fetch('../data/people.json').then(function(response) {
  return response.json();
}).then(function(data) {
    console.log(data)
    var html = listTemplate(data);
    console.log(html);
    spawnWindow({
        title: 'People',
        content: html,
        x: 100,
        y: 100,
        width: 350,
        height: 500
    })

});