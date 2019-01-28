describe('William Hill Scenario 1', () => {
    it('should open the url', () => {
        browser.get('https://sports.williamhill.com/betting/en-gb');
        browser.sleep(3000);  
    });

    it('should assert presence of Cookie notice pop-up', () => {
        let cookieNotice = element(by.css('.cookie-disclaimer'));
        expect(cookieNotice.isPresent()).toBe(true);        
    });

    it('should close cookie notice', () => {
        element(by.css('.cookie-disclaimer__button')).click()    
    });

    it('should assert presence of cdb cookie', async () => {
        let cookie = await browser.manage().getCookie("cdb")

        expect(cookie.domain).toBe('.williamhill.com');
    });
});  


