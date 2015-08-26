(function() {
    "use strict";

    var embedVideos = function(selector) {
        var $wrapper = $(selector || document);

        var embedVideo = function(morphUrl) {
            return function(i, el) {
                var $el = $(el);
                var src = $el.attr('src');
                var url = morphUrl(src);
                var iframe = $('<iframe frameborder="0" class="embed-video" allowfullscreen>')
                    .attr('src', url)
                    .css('display', 'block')
                    .css('max-width', '100%')
                    .css('width', '560px')
                    .css('height', '315px')
                    .css('margin', '1em 0');
                $el.replaceWith(iframe);
            };
        };

        $wrapper.find('img[alt=vimeo]').each(embedVideo(function(src) {
            var id = src.match(/.*\/(.*)$/)[1];
            return 'https://player.vimeo.com/video/' + id;
        }));
        $wrapper.find('img[alt=youtube]').each(embedVideo(function(src) {
            var id = (src.match(/.*\?v=(.*)$/) || src.match(/.*youtu\.be\/(.*)/))[1];
            return 'https://www.youtube.com/embed/' + id;
        }));
    };

    $(document).ready(function() {
        embedVideos('.proposal');
        embedVideos('.comment');
        embedVideos('.instance_description');
    });
})();
