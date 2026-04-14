"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_rsc_lib_scrapers_jina_ts";
exports.ids = ["_rsc_lib_scrapers_jina_ts"];
exports.modules = {

/***/ "(rsc)/./lib/scrapers/jina.ts":
/*!******************************!*\
  !*** ./lib/scrapers/jina.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   scrapeWithJina: () => (/* binding */ scrapeWithJina)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n\n/**\n * Universal Jina Reader Scraper (Token-less AI Scraping)\n * Converts any URL to clean Markdown for LLM consumption.\n */ async function scrapeWithJina(url) {\n    try {\n        const readerUrl = `https://r.jina.ai/${url.replace(/^https?:\\/\\//, '')}`;\n        const { data } = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(readerUrl, {\n            headers: {\n                'Accept': 'text/plain',\n                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'\n            },\n            timeout: 15000\n        });\n        return data;\n    } catch (e) {\n        console.warn(`Jina Reader failed for ${url}:`, e.message);\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc2NyYXBlcnMvamluYS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUEwQjtBQUUxQjs7O0NBR0MsR0FDTSxlQUFlQyxlQUFlQyxHQUFXO0lBQzlDLElBQUk7UUFDRixNQUFNQyxZQUFZLENBQUMsa0JBQWtCLEVBQUVELElBQUlFLE9BQU8sQ0FBQyxnQkFBZ0IsS0FBSztRQUN4RSxNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHLE1BQU1MLDZDQUFLQSxDQUFDTSxHQUFHLENBQUNILFdBQVc7WUFDMUNJLFNBQVM7Z0JBQ1AsVUFBVTtnQkFDVixjQUFjO1lBQ2hCO1lBQ0FDLFNBQVM7UUFDWDtRQUNBLE9BQU9IO0lBQ1QsRUFBRSxPQUFPSSxHQUFRO1FBQ2ZDLFFBQVFDLElBQUksQ0FBQyxDQUFDLHVCQUF1QixFQUFFVCxJQUFJLENBQUMsQ0FBQyxFQUFFTyxFQUFFRyxPQUFPO1FBQ3hELE9BQU87SUFDVDtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFdpbmRvd3MgMTBcXERvd25sb2Fkc1xcZm91bmRyZWVcXGZpbmFsXFxmb2xpb3N5bmNcXGxpYlxcc2NyYXBlcnNcXGppbmEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuLyoqXG4gKiBVbml2ZXJzYWwgSmluYSBSZWFkZXIgU2NyYXBlciAoVG9rZW4tbGVzcyBBSSBTY3JhcGluZylcbiAqIENvbnZlcnRzIGFueSBVUkwgdG8gY2xlYW4gTWFya2Rvd24gZm9yIExMTSBjb25zdW1wdGlvbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNjcmFwZVdpdGhKaW5hKHVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVhZGVyVXJsID0gYGh0dHBzOi8vci5qaW5hLmFpLyR7dXJsLnJlcGxhY2UoL15odHRwcz86XFwvXFwvLywgJycpfWA7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBheGlvcy5nZXQocmVhZGVyVXJsLCB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAndGV4dC9wbGFpbicsXG4gICAgICAgICdVc2VyLUFnZW50JzogJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MS4wLjQ0NzIuMTI0IFNhZmFyaS81MzcuMzYnXG4gICAgICB9LFxuICAgICAgdGltZW91dDogMTUwMDBcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgY29uc29sZS53YXJuKGBKaW5hIFJlYWRlciBmYWlsZWQgZm9yICR7dXJsfTpgLCBlLm1lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJzY3JhcGVXaXRoSmluYSIsInVybCIsInJlYWRlclVybCIsInJlcGxhY2UiLCJkYXRhIiwiZ2V0IiwiaGVhZGVycyIsInRpbWVvdXQiLCJlIiwiY29uc29sZSIsIndhcm4iLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/scrapers/jina.ts\n");

/***/ })

};
;