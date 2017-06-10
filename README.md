# Desktop
Website for A Nice Pair

## Development Setup

Clone this repository by running
```
git clone https://github.com/awesomephant/desktop-website.git
```

Then navigate into the project folder:
```
cd desktop-website
```

Install dependencies using [yarn](https://yarnpkg.com/lang/en/)
```
yarn
```
or npm: 
```
npm install
```
Build the necessary files by running
```
grunt build
```
You only need to do this once. Then, start the development server by running
```
grunt
```

Make sure you have grunt-cli installed. If not, run `npm install -g grunt-cli`


## Updating student data
This requires nodejs to be installed.
1. Download [this spreadsheet](https://docs.google.com/spreadsheets/d/1aGb_1RbQFDHfyNVOlDAjrLRaj03vQWU1kwn54xqRjXc/edit#gid=1867528276) as a CSV
2. Place the CSV file in `./data` and rename it to `people.csv`
3. Run `node parsePeople.js`
