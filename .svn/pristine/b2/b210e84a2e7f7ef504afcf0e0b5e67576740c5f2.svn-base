/**
 * Created by Mark Aquino on 1/3/17.
 */

import React from 'react';
import Link from '../src/components/Link.react';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <Link page="http://www.facebook.com">Facebook</Link>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //trigger callback
    tree.props.onMouseEnter();
    //re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //retrigger callback
    tree.props.onMouseLeave();
    //rerender
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
