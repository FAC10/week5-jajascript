// Test to check QUnit is working
QUnit.test('2 equals 2', function(assert) {
  assert.equal(2, 2, '2 is equal to 2');
});

QUnit.test('Test that secToMin returns the correct output, input = 121', function(assert) {
  assert.equal(secToMin(121), '2:01', '121 returns 2:01! Yay, our test works!');
});

QUnit.test('Test that secToMin returns the correct output, input = 79', function(assert) {
  assert.equal(secToMin(79), '1:19', '79 returns 1:19! Yay, our test works!');
});
// QUnit.test('Test that getUserInput returns correct userInput', function(assert) {
//     var event = {
//       target: {
//         value: 'bar'
//       }
//     }
//     assert.equal(getUserInput(event), 'bar', 'Yay, our test works!');
//   });
