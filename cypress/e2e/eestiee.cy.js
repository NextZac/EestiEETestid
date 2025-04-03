describe("eesti.ee veebilehe testid", () => {
  beforeEach(() => {
    cy.visit("https://www.eesti.ee");
    cy.viewport(1350, 900);
  });

  describe("Avalehe laadimine ja elementide kontroll", () => {
    it("leht peaks laaduma korrektselt", () => {
      cy.url().should("include", "eesti.ee");
      cy.title().should("not.be.empty");
    });

    it("otsinguriba peaks olema nähtav ja funktsionaalne", () => {
      cy.get("search-bar")
        .should("be.visible")
        .find("div > input[type=text]")
        .should("have.attr", "placeholder")
        .and("match", /otsi/i);
    });

    it("peamised menüüpunktid peaksid olema olemas ja töötavad", () => {
      const menuItems = [
        " Aktuaalsed teemad ",
        " Eesti Vabariik ",
        " Õigusabi ",
      ];

      menuItems.forEach((item) => {
        cy.contains(
          "stateportal-sidemegamenu > div > div > div:nth-child(3) > div > div.rounded > ul > li > button > div > div > p",
          item,
        )
          .should("be.visible")
          .click()
          .url();
      });
    });
  });

  describe("Otsingufunktsionaalsuse testimine", () => {
    it('otsingu "Eesti hümn" tulemused peaksid olema asjakohased', () => {
      cy.get("search-bar input[type=text]").type("Eesti hümn{enter}");

      cy.url().should("include", "search=");
      cy.contains(
        "results-page > div > div > div > div > div > h2",
        "Artiklid",
      ).should("be.visible");
      cy.contains(
        "results-page > div > div > div > div > div > div > div > div > div > h3 > mark",
        "Eesti hümn",
      ).should("be.visible");
      cy.get(
        "results-page > div > div > div > div > div > div > div > div > div > div > button",
      ).should("exist");
    });

    it("tühja otsingu korral peaks kuvama veateate", () => {
      cy.visit("https://www.eesti.ee/eraisik/et/otsing?search=%20");
      cy.get("results-page > div > div.no-results > div > div.no-results-title")
        .should("be.visible")
        .and("contain", "0 tulemust");
      cy.get("results-page > div > div.no-results > div > div.no-results-text")
        .should("be.visible")
        .and(
          "contain",
          " Kasuta teisi märksõnu, vaata igaks juhuks üle õigekiri või kirjuta meile ",
        );
    });
  });

  describe("Teenuste lehele navigeerimine", () => {
    it('"Tervis ja retseptid" alateenused peaksid kuvama', () => {
      cy.contains(
        "stateportal-sidemegamenu > div > div > div:nth-child(4) > div > div.rounded > ul > li > button > div > div > p",
        "Tervis ja retseptid",
      )
        .should("be.visible")
        .click();

      const menuItems = [
        " Jäin haigeks ",
        " Retseptid ",
        " Ravikindlustus ",
        " Arstiabi ",
        " Arstiabi ja ravi välismaal ",
        " Ajutine töövõimetus ",
        " Haigushüvitise maksmine ",
        " Püsiv töövõimetus ",
        " Tervis reisil ",
        " Vaktsineerimine ",
        " Ravimite ohutus ja kõrvaltoimest teatamine ",
        " Mürgistusteabekeskus ",
        " Töötervishoid ja tööohutus ",
        " Kutsehaigus ",
        " Tööõnnetus ",
      ];

      cy.get(
        "div.sidenav-mega-menu-container > div.row > div:nth-child(1) > div:nth-child(1) > div > div > div > div > lib-stateportal-routing > span > a >div > p",
      ).each(($el) => {
        const text = $el.text();
        expect(menuItems).to.include(text);
      });
    });

    it('"Retseptid" leht peaks laadima korrektselt', () => {
      cy.contains(
        "stateportal-sidemegamenu > div > div > div:nth-child(4) > div > div.rounded > ul > li > button > div > div > p",
        "Tervis ja retseptid",
      )
        .should("be.visible")
        .click();
      cy.contains(
        "div.sidenav-mega-menu-container > div.row > div:nth-child(1) > div:nth-child(1) > div > div > div > div > lib-stateportal-routing > span > a >div > p",
        " Retseptid ",
      )
        .should("be.visible")
        .click();
    });

    it("terviseportaali link peaks avanema uues aknas", () => {
      cy.contains(
        "stateportal-sidemegamenu > div > div > div:nth-child(4) > div > div.rounded > ul > li > button > div > div > p",
        "Tervis ja retseptid",
      )
        .should("be.visible")
        .click();
      cy.contains(
        "div.sidenav-mega-menu-container > div.row > div:nth-child(1) > div:nth-child(1) > div > div > div > div > lib-stateportal-routing > span > a >div > p",
        " Retseptid ",
      )
        .should("be.visible")
        .click();

      cy.contains("a", "terviseportaalis")
        .should("have.attr", "target", "_blank")
        .then((link) => {
          cy.request(link.prop("href")).its("status").should("eq", 200);
        });
    });
  });

  describe("Kontaktinfo lehe kontroll", () => {
    beforeEach(() => {
      cy.contains(
        "div:nth-child(2) > div > div > div:nth-child(1) > lib-stateportal-routing > span > a",
        " Võtke meiega ühendust ",
      ).click({ force: true });
    });

    it("kontaktivormi väljad peaksid olema olemas", () => {
      cy.get("stateportal-contact-form-view form").should("exist");

      cy.get('input[aria-invalid="true"][required]').should(
        "have.length.at.least",
        2,
      );

      cy.contains("label", "Ees- ja perekonnanimi")
        .should("exist")
        .next()
        .find('input[type="text"][required]')
        .should("exist")
        .and("be.visible");

      cy.contains("label", "E-posti aadress")
        .should("exist")
        .next()
        .find('input[type="text"][required]')
        .should("exist")
        .and("be.visible");

      cy.contains("legend", "Valige roll, millega soovite abi")
        .should("exist")
        .parent()
        .find('input[type="radio"][name="role"]')
        .should("have.length.at.least", 2);

      cy.contains("label", "Millise teenusega soovite abi?")
        .should("exist")
        .next()
        .find('button[role="combobox"]')
        .should("exist")
        .and("be.visible");

      cy.contains("label", "Milline takistus tekkis teenuse kasutamisel?")
        .should("exist")
        .next()
        .find('button[role="combobox"]')
        .should("exist")
        .and("be.visible");

      cy.contains("label", "Kirjeldage olukorda või küsimust")
        .should("exist")
        .parent()
        .find("textarea")
        .should("exist")
        .and("be.visible");

      cy.contains("label", "Lisage ekraanipilt veateatest")
        .should("exist")
        .parent()
        .find('input[type="file"]')
        .should("exist");

      cy.contains("button", "Tühjenda väljad")
        .should("exist")
        .and("be.visible");

      cy.contains("button", "Saada kiri")
        .should("exist")
        .and("be.visible")
        .and("have.class", "ria-btn-primary");
    });

    it("vale e-posti aadressiga peaks kuvama veateate", () => {
      cy.contains("label", "E-posti aadress")
        .should("exist")
        .next()
        .find('input[type="text"][required]')
        .type("vale-email");
      cy.contains("label", "Kirjeldage olukorda või küsimust")
        .should("exist")
        .parent()
        .find("textarea")
        .type("Testküsimus");
      cy.get(
        "stateportal-contact-form > form > div.d-flex.flex-column.flex-column-reverse.flex-md-row.justify-content-between.gap-3 > button",
      ).click();

      cy.get("p.validation-error")
        .should("be.visible")
        .and("contain", " Sisestage kehtiv e-posti aadress. ");
    });
  });
});
