(function() {

    // Used to hold information from aside.md and activity.md
    var data = {
        content: {}
    };

    // Builds the left sidebar
    function bindGuideData() {
        var source = $("#guide-template").html();
        var template = Handlebars.compile(source);

        console.log("Loading guide.md markdown file...");

        function successfulyLoadedMarkdownFile(markdownData) {
            var asideData = metaMarked(markdownData);

            data.content = asideData.html;

            console.log("Binding guide data...");

            $("#guide").html(template(data));
        }

        $.ajax({
            url: "data/guide.md",
            type: 'get',
            dataType: 'html',
            success: successfulyLoadedMarkdownFile
        });

    }



    // Handlebar helpers
    Handlebars.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });

    // Load main content area and start the app.
    bindGuideData();
}());
