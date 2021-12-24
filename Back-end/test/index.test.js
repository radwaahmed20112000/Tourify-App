before(function (done) {

    // Increase the Mocha timeout 
    this.timeout(20000);

})

// After all tests have finished...
after(function (done) {

    this.timeout(300000);

    // Remove records created in the DB during the tests 

  
})