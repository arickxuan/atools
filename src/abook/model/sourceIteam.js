class RuleExplore {
    constructor() {
        this.author = "";
        this.bookList = "";
        this.lastChapter = "";
        this.wordCount = "";
        this.intro = "";
        this.kind = "";
        this.coverUrl = "";
        this.bookUrl = "";
        this.name = "";
    }
}

class RuleSearch {
    constructor() {
        this.author = "<js>\"VISTA看天下\"</js>";
        this.bookList = "$.magList";
        this.lastChapter = "$.subtitle";
        this.wordCount = "$.releaseDateFormat";
        this.intro = "$.articleTitle";
        this.kind = "$.magStyle";
        this.coverUrl = "$.coverUrl";
        this.bookUrl = "https://open3.vistastory.com/v3/api/magazine/mag_column_detail?magId={{$.id}}";
        this.name = "$.title";
    }
}

class RuleBookInfo {
    constructor() {
        this.coverUrl = "";
        this.author = "";
        this.wordCount = "";
        this.name = "";
        this.tocUrl = "";
        this.init = "";
    }
}

class RuleContent {
    constructor() {
        this.content = "<img src=\"{{$.article.coverUrl}}\">\n{{$.article..content}}";
        this.nextContentUrl = "";
        this.imageStyle = "";
    }
}

class RuleToc {
    constructor() {
        this.chapterName = "$.title";
        this.chapterUrl = "https://open3.vistastory.com/v3/api/article/article_detail2?articleId={{$.id}}&isShowNext=0";
        this.chapterList = "$..articles.*";
    }
}

class BookSource {
    constructor() {
        this.ruleExplore = new RuleExplore();
        this.bookSourceType = 0;
        this.ruleSearch = new RuleSearch();
        this.ruleBookInfo = new RuleBookInfo();
        this.respondTime = 1865245;
        this.ruleContent = new RuleContent();
        this.searchUrl = "";
        this.weight = 38;
        this.enabledExplore = true;
        this.bookSourceComment = "纯发现源";
        this.ruleToc = new RuleToc();
        this.enabled = true;
        this.bookSourceUrl = "https://open3.vistastory.com";
        this.lastUpdateTime = 1631320174217;
        this.bookSourceName = "VISTA看天下(纯发现源)";
        this.bookSourceGroup = "本地仓库";
        this.exploreUrl = "看天下::https://open3.vistastory.com/v3/api/magazine/all_mag_page?pageNo={{page-1}}&pageSize=18&magType=1\n号外::https://open3.vistastory.com/v3/api/magazine/all_mag_page?pageNo={{page-1}}&pageSize=18&magType=2\nVbook::https://open3.vistastory.com/v3/api/magazine/all_mag_page?pageNo={{page-1}}&pageSize=18&magType=3";
        this.customOrder = 452;
    }
}

// 使用示例
const bookSource = new BookSource();
console.log(bookSource);
