//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("#applyRules()", () =>{
    var psd = new myExtension.PowerShellDocument();
    test("Should rewrite the file to CamelCase all keywords",() => {
        let input = "if";
        let expectedOutput = "If";
        let output = psd.applyRules(input);
        assert.equal(output,expectedOutput);
    });
})