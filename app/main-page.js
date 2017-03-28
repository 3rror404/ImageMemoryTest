var imageModule = require("ui/image");
var imageSourceModule = require("image-source");
var labelModule = require("ui/label");
var stackLayoutModule = require("ui/layouts/stack-layout");
var animationModule = require("ui/animation");
var frameModule = require("ui/frame");
var enums = require("ui/enums");
var Platform = require('platform');
var timer = require("timer");
var colorModule = require("color");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

var page;
var question1;
var question2;
var questionsWrap;
var currentQuestionIndex = 0;
var startTime;
var endTime;
//var answers = [];

var pageData = new Observable();

exports.onLoaded = function(args) {
    page = args.object;

    page.bindingContext = pageData;

    questionsWrap = page.getViewById('questions-wrap');
  
}

exports.onNavigatedTo = function(args) {
    fetchQuestions();  
}


function fetchQuestions() {
    loadQuestion();
}

function loadQuestion() {
    loadQuestionImages();
}

function loadQuestionImages() {
    // ## Load both images before binding to ensure
    // ## both display at same time.

    var loadedImages = 0;
    var imageSRC_1;
    var imageSRC_2;

    imageSourceModule.fromUrl('https://placehold.it/2000x2000')
        .then(function (res) {
            loadedImages = loadedImages + 1;
            imageSRC_1 = res;

            if (loadedImages == 2) {
                imagesLoaded();
            }
        }, function (error) {
            //console.log("Error loading image: " + error);
        });

    imageSourceModule.fromUrl('https://placehold.it/2000x2000')
        .then(function (res) {
            loadedImages = loadedImages + 1;
            imageSRC_2 = res;

            if (loadedImages == 2) {
                imagesLoaded();
            }
        }, function (error) {
            //console.log("Error loading image: " + error);
        });

    function imagesLoaded() {

        var image1_orig = page.getViewById('question-1-image');
        var image2_orig = page.getViewById('question-2-image');

        var image1 = new imageModule.Image();   
        image1.imageSource = imageSRC_1;
        image1.stretch = 'aspectFill';
        image1.id = 'question-1-image';
        var image2 = new imageModule.Image();
        image2.imageSource = imageSRC_2;
        image2.stretch = 'aspectFill';
        image2.id = 'question-2-image';

        var image1_wrap = page.getViewById('image1_wrap');
        var image2_wrap = page.getViewById('image2_wrap');

        image1_wrap.removeChild(image1_orig);
        image2_wrap.removeChild(image2_orig);

        image1_wrap.addChild(image1);
        image2_wrap.addChild(image2);

        // pageData.set('imageSRC_1', imageSRC_1);
        // pageData.set('imageSRC_2', imageSRC_2);

        animateInImages();
    }
}

exports.tapQuestion = function(args) {
    endQuestion();
}

function endQuestion() {
    animateOutImages();
}

function animateOutImages() {
    var animations = [
        {   
            target: questionsWrap,
            opacity: 0,
            duration: 250,
            curve: enums.AnimationCurve.easeIn
        }
    ];
    
    var anim = new animationModule.Animation(animations);
    anim.play().then(function() {
        loadQuestion()    ;
    });
}

function animateInImages() {
    questionsWrap.style.opacity = 1;
}
