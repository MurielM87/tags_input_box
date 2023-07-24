const ul = document.querySelector('ul');
const input = document.querySelector('input');
const countNumb = document.querySelector('.details span');

let maxTags = 10;
let tags = [];

countTag();

function countTag() {
    input.focus();
    countNumb.innerText = maxTags - tags.length; //subtracting max value with tags length
};

function createTag() {
    ul.querySelectorAll('li').forEach(li => li.remove()); //removing all li tags before adding so there will be no duplicate tags
    tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag}<i class="fas fa-times" onclick="removeTag(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    })
    countTag();
};

function removeTag(element, tag) {
    let index = tags.indexOf(tag); //getting removing tag index
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)]; //removing or excluding selected tag from an array
    element.parentElement.remove(); //removing li of removed tag
    countTag();
};

function addTag(e) {
    if (e.key == 'Enter') {
        let tag = e.target.value.replace(/\s+/g, ' '); //removing unwanted spaces i a tag
        if (tag.length > 1 && !tags.includes(tag)) { //if tag length is greater than 1 and the tag isn't exist alrealdy
            if (tags.length < 10) {
                tag.split(',').forEach(tag => {
                    tags.push(tag); //adding each tag inside array
                    createTag();
                })
            }
        }
        e.target.value = '';
    }
};

input.addEventListener('keyup', addTag)

const removeBtn = document.querySelector('button');
removeBtn.addEventListener('click', () => {
    tags.length = 0;
    ul.querySelectorAll('li').forEach(li => li.remove);
    countTag();
})