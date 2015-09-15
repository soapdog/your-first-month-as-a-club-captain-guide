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

            bindTOC();

        }

        $.ajax({
            url: "data/guide.md",
            type: 'get',
            dataType: 'html',
            success: successfulyLoadedMarkdownFile
        });

    }

    function bindTOC() {
      var source = $("#toc-template").html();
      var template = Handlebars.compile(source);
      var toc = tableOfContentFromHTML(document, "#guide");

      console.log("building table of contents...");
      $("#toc").html(template(toc));

    }

    // Reading Options releated functions
    function closeReadingOptionsDialog() {
        $('#readingOptions').foundation('reveal', 'close');
    }


    function changeGuideFont(event) {
        var fontFamily = event.target.value;
        var guide = document.querySelector("#guide");

        console.log("Reading options. Changing font to:", fontFamily);


        guide.classList.remove("text-opensans");
        guide.classList.remove("text-firasans");
        guide.classList.remove("text-droidsans");
        guide.classList.remove("text-times");

        guide.classList.add(fontFamily)


        closeReadingOptionsDialog();
    }

    function changeGuideFontSize(event) {
        var fontSize = event.target.value;
        var guide = document.querySelector("#guide");


        console.log("Reading options. Changing font size to:", fontSize);

        guide.classList.remove("text-normal");
        guide.classList.remove("text-large");
        guide.classList.remove("text-small");

        guide.classList.add(fontSize)

        closeReadingOptionsDialog();
    }

    // Bind reading options controls
    $("input[name='fontFamilySelector']").change(changeGuideFont);
    $("input[name='fontSizeSelector']").change(changeGuideFontSize);



    // Handlebar helpers
    Handlebars.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });

    Handlebars.registerHelper('matchTag', function (conditional, options) {
        if (conditional.indexOf(this.tag) > -1) {
            return options.fn(this);
        }

    });

    // Load foundation
    $(document).foundation();

    // Load main content area and start the app.
    bindGuideData();
}());
