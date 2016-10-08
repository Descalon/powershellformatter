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
        let input = "iF, FunCTiOn, WhIlE";
        let expected = "If, Function, While";
        let actual = psd.applyRules(input);
        assert.equal(actual,expected);
    });
    test("Should rewrite tabs to spaces",() =>{
        let input = "	";
        let expected = "    ";
        let actual = psd.applyRules(input);
        assert.equal(actual,expected);
    });
    test("Should pad parentheses", () => {
        let input = "something something(){}"
        let expected = "something something () {}"
        let actual = psd.applyRules(input);
        assert.equal(actual,expected);
    });
    test("should remove newline before opening curly bracket", () => {
        let input = `Function somefunction ()
        {
            //Something
        }`;
        let expected = `Function somefunction () {
            //Something
        }`
        let actual = psd.applyRules(input);
        assert.equal(actual,expected);
    });
})