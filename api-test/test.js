const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

describe('William Hill API Test 1', () => {

    it('should return success response', () => {
        chai.request('https://api.carbonintensity.org.uk')
            .get('/regional')
            .end((err, res) => {
                expect(res).to.have.status(200);

                let regionalData = res.body.data[0].regions

                regionalData.sort((obj1, obj2) => {
                    return obj2.intensity.forecast - obj1.intensity.forecast
                });

                regionalData.forEach(region => {
                    console.log(region.intensity.forecast, region.shortname)
                })
            });
    });

    it('should assert that generation mix sums to 100', () => {
        chai.request('https://api.carbonintensity.org.uk')
            .get('/regional')
            .end((err, res) => {
                let regionalData = res.body.data[0].regions
                regionalData.forEach(region => {
                    let toSum = region.generationmix.map(g => g.perc)
                    generationmixSum = toSum.reduce((a, b) => a + b, 0)
                    expect(generationmixSum).to.be.equal(100)
                })
            });
    })

    it('should list five regions where the generation percentage is the highest', () => {
        chai.request('https://api.carbonintensity.org.uk')
            .get('/regional')
            .end((err, res) => {
                let fuelTypes = []

                regionalData = res.body.data[0].regions
                regionalData = regionalData.map(region => {
                    fuelTypes = region.generationmix.map(mix => mix.fuel)
                    
                    region.generationmixSum = {}
                    fuelTypes.forEach(fuelType => {
                        region.generationmixSum[fuelType] = region.generationmix.reduce((prev, cur) => {
                            if (fuelType === cur.fuel) {
                                return prev + cur.perc
                            } else {
                                return prev
                            }
                        }, 0)
                    })
                    return region;
                })

                fuelTypes.forEach(fuelType => {
                    console.log(fuelType)
                    console.log('-----------')
                    regionalData = regionalData.sort((obj1, obj2) => {
                        return obj2.generationmixSum[fuelType] - obj1.generationmixSum[fuelType]
                    });
                    for (let i = 0; i<5; i++) {
                        console.log(regionalData[i].shortname, regionalData[i].generationmixSum[fuelType])
                    }
                    console.log("\n")
                })
            })
    })
});
