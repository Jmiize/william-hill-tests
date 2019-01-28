const switchLanguage = async (lang) => {
    element(by.css('.js-language-button')).click();
    var langButton = element(by.css(`#subheader-desktop #${lang}`));
    browser.executeScript("arguments[0].scrollIntoView();", langButton.getWebElement());
    await langButton.click();
};

const checkJoinButton = (text) => {
    let joinButton = element(by.id('joinLink'));
    expect(joinButton.isPresent()).toBe(true);
    expect(joinButton.getText()).toBe(text);
}

describe('William Hill Scenario 2', () => {
    it('should have a join button', () => {
        browser.get('https://sports.williamhill.com/betting/en-gb');
        checkJoinButton('Join');
    });

    it('should switch language to german', () => {
        switchLanguage('de');
    });
    it('should have a join button', () => {
        checkJoinButton('Anmelden');
    });

    it('should switch language to japanese', () => {
        switchLanguage('ja');
    });
    it('should have a join button', () => {
        checkJoinButton('登録');
    });

    it('should switch language to greek', () => {
        switchLanguage('el');
    });
    it('should have a join button', () => {
        checkJoinButton('Εγγραφή');
    });
});  
