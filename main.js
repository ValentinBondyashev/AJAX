$('.search-but').on('click', loadTracks);

function sendRequest(func){
    $.ajax({
        url:'https://itunes.apple.com/search?limit=5&term=' + $('.search-track').val(),
        method: 'GET',
        dataType: 'JSONP',
        success: func
    });
}

function loadTracks(){
    sendRequest(function(data){
        drowTracks(data.results)
    });
}

function drowTracks(tracks){
    var html = '';
    for(var i = 0; i < tracks.length; i++){

        var t = tracks[i];

        function getTime(time){
            Date.prototype.format = function (mask, utc) {
                return dateFormat(this, mask, utc);
            };
            var timestamp = time,
                d = new Date(timestamp),
                minutes = d.getMinutes(),
                seconds = d.getSeconds();

            return minutes + ":" + seconds
        }
        
        html += '<li class="list-tracks-item">' 
                    +'<div class="main-block">'
                        +'<div>'
                            +'<img src="'+t.artworkUrl100 +'">' + '</img>'
                        +'</div>'
                        +'<div>'
                            +'<p>'+'<span class="bold">'+'Artist :'+'</span>'+ '<br>' +t.artistName+'</p>'
                        +'</div>'
                        +'<div>'
                            +'<p>'+'<span class="bold">'+'Track :'+'</span>'+ '<br>' +t.trackName+'</p>'
                        +'</div>'
                        +'<div>'
                            +'<p>'+'<span class="bold">'+'Colection :'+'</span>'+ '<br>' +t.collectionName+'</p>'
                        +'</div>'
                        +'<div>'
                            +'<p>'+'<span class="bold">'+'Genere :'+'</span>'+ '<br>' +t.primaryGenreName+'</p>'
                        +'</div>'
                        +'<div class="plus">'
                            +'<span class="plus_line plus_line-horizontal">'+'</span>'
                            +'<span class="plus_line plus_line-vertical">'+'</span>'
                        +'</div>'
                    +'</div>'
                    +'<ul class="list-tracks-item_detail">'
                        +'<h2>'+t.artistName+ " - " +t.trackName+ '<i class="fas fa-music">'+'</i>'+'</h2>'
                        +'<li>'+'<span class="bold">'+'Track Count : '+'</span>'+" "+t.trackCount+'</li>'
                        +'<li>'+'<span class="bold">'+'Price : '+'</span>'+t.collectionPrice+ " "+" "+ t.currency+'</li>'
                        +'<li>'+'<span class="bold">'+'Track duration : '+'</span>'+" "+getTime(t.trackTimeMillis)+ "min"+'</li>'
                        +'<li>'+'<span class="bold">'+'Track Price : '+'</span>'+"    "+t.trackPrice+ " " + t.currency+'</li>'
                    +'</ul>'
                +'</li>' 
                ;
    }
    $('.list-tracks').html(html);

    $(".list-tracks ul").hide().prev().click(function() {
        $(this).parents(".list-tracks").find("ul").not(this).slideUp().prev().removeClass("active");
        $(this).next().not(":visible").slideDown().prev().addClass("active");
        $(document).on('click','.nav',function(){
            $('.nav').toggleClass('activ');
        });
    });

}
