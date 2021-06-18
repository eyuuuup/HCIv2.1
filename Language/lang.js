function toggleLanguage(language) {
    let description = document.getElementById("description");
    if (language === "Korean") {
      description.innerHTML = "Show Korean Text";
    }
    else {
      description.innerHTML = "Show English Text";
    }
