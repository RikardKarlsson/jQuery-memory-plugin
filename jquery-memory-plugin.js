/*global $, jQuery */
$(document).ready(function () {
    'use strict';

    (function ($) {
        $.fn.memory = function (options) {
            options = $.extend({}, $.fn.memory.defaults, options);
            return this.each(function () {
                var //id,
                    memoryObj,
                    memoryMaker,
                    cardMaker,
                    i;
                cardMaker = function (id) {
                    var obj = {},
                        isFaceUp = false,
                        isPaired = false;

                    obj.isEqual = function (otherCard) {
                        return id === otherCard.getId();
                    };
                    obj.getId = function () {
                        return id;
                    };
                    obj.turnUp = function () {
                        isFaceUp = true;
                    };
                    obj.turnDown = function () {
                        isFaceUp = false;
                    };
                    obj.isFaceUp = function () {
                        return isFaceUp;
                    };
                    obj.setPaired = function () {
                        isPaired = true;
                    };
                    obj.isPaired = function () {
                        return isPaired;
                    };
                    return obj;
                };
                memoryMaker = function (noPairs) {
                    var obj = {},
                        id,
                        index,
                        noPaired = 0,
                        board,
                        noOpenCards = 0,
                        indexOpenCardOne = -1,
                        indexOpenCardTwo = -1;
                    //make board
                    board = [];
                    id = 0;
                    index = 0;
                    for (index = 0; index < noPairs * 2; index = index + 2) {
                        //add a pair of cards
                        board[index] = cardMaker(id); //or id + "-a"
                        board[index + 1] = cardMaker(id); //or id + "-b"
                        id = id + 1;
                    }
                    //shuffle cards
                    //walk through table and swap current cell content with random cell content
                    obj.shuffle = (function () {
                        var temp,
                            random;
                        for (index = 0; index < board.length; index = index + 1) {
                            random = parseInt(Math.random() * board.length, 10);
                            temp = board[index];
                            board[index] = board[random];
                            board[random] = temp;
                        }
                    }());
                    obj.turnCard = function (index) {
                        if (noOpenCards === 0) {
                            if (board[index].isPaired()) {
                                return false;
                            }
                            board[index].turnUp();
                            indexOpenCardOne = index;
                            noOpenCards = 1;
                            return true;
                        }
                        if (noOpenCards === 1) {
                            if (board[index].isPaired() ||
                                    index === indexOpenCardOne) {
                                return false;
                            }
                            board[index].turnUp();
                            indexOpenCardTwo = index;
                            noOpenCards = 2;
                            if (board[indexOpenCardOne].isEqual(board[indexOpenCardTwo])) {
                                //console.log("equal");
                                board[indexOpenCardOne].setPaired();
                                board[indexOpenCardTwo].setPaired();
                                noPaired += 1;
                                console.log("no paired: " + noPaired);
                            }
                            return true;
                        }
                        if (noOpenCards === 2) {
                            if (!board[indexOpenCardOne].isEqual(board[indexOpenCardTwo])) {
                                //turn down open cards
                                board[index].turnDown();
                                board[index].turnDown();
                            }
                            noOpenCards = 0;
                            var result = {
                                indexCardOne: indexOpenCardOne,
                                indexCardTwo: indexOpenCardTwo,
                                idCardOne: board[indexOpenCardOne].getId(),
                                idCardTwo: board[indexOpenCardTwo].getId(),
                                isPaired: board[indexOpenCardOne].isPaired()
                            };

                            indexOpenCardOne = -1;
                            indexOpenCardTwo = -1;
                            return result;
                        }
                    };
                    obj.getId = function (index) {
                        return board[index].getId();
                    };
                    obj.getNoCards = function () {
                        return board.length;
                    };
                    obj.isAllPaired = function () {
                        return noPaired === noPairs;
                    };
                    return obj;
                };
                memoryObj = memoryMaker(options.noPairs);
                $(this).append("<div></div>");
                for (i = 0; i < memoryObj.getNoCards(); i += 1) {
                    $(this).children().first().append("<div class='back'></div>");
                }
                $(this).children().first().children().each(function (index) {
                    $(this).click(function () {
                        var id,
                            cssClass,
                            turnResult;
                        if (memoryObj.isAllPaired()) {
                            memoryObj = memoryMaker(options.noPairs);
                            $(this).parent().children().removeClass();
                            $(this).parent().children().addClass("back");

                        } else {
                            turnResult = memoryObj.turnCard(index);
                            if (turnResult === true) {
                                id = memoryObj.getId(index);
                                cssClass = "card-no-" + id;
                                $(this).toggleClass("back");
                                $(this).toggleClass(cssClass);
                                if (memoryObj.isAllPaired()) {
                                    $(this).parent().children().fadeTo(1000, 1);
                                }
                            } else if (turnResult !== false) {
                                if (turnResult.isPaired) {
                                    $(this).parent().children().eq(turnResult.indexCardOne).fadeTo(400, 0.5);
                                    $(this).parent().children().eq(turnResult.indexCardTwo).fadeTo(400, 0.5);
                                } else {
                                    cssClass = "card-no-" + turnResult.idCardOne;
                                    $(this).parent().children().eq(turnResult.indexCardOne).toggleClass("back");
                                    $(this).parent().children().eq(turnResult.indexCardOne).toggleClass(cssClass);
                                    cssClass = "card-no-" + turnResult.idCardTwo;
                                    $(this).parent().children().eq(turnResult.indexCardTwo).toggleClass("back");
                                    $(this).parent().children().eq(turnResult.indexCardTwo).toggleClass(cssClass);
                                }
                            }
                        }
                    });
                });
            });
        };
        $.fn.memory.defaults = {
            'noPairs': 8,
        };
    }(jQuery));
});