import $ from 'jquery';

const kayacHtml5Starter = new KayacHtml5Starter({
    name: 'world'
});

$(document.body).on('click', () => {
    kayacHtml5Starter.say();
});
