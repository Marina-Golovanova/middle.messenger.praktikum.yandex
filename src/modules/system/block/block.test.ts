import { ButtonIcon } from '@components/button-icon';
import { editIconTemplate } from '@components/icons-templates/editIconTemplate';
import { SimpleElement } from '@components/simple-element';
import { Block } from './Block';

describe('Test block', () => {
  test('renders given tag', () => {
    const testUlComponent = new SimpleElement({ tagName: 'ul' });
    expect(testUlComponent.element.tagName).toBe('UL');
  });

  test('render templates', () => {
    const editIconTitle = 'editIcon';
    const testButtonIconProps = { title: editIconTitle };

    const testButtonIconComponent = new ButtonIcon({
      props: {
        template: editIconTemplate,
        iconProps: testButtonIconProps,
      },
    });

    const iconTitle = testButtonIconComponent
      .getContent()
      .getElementsByTagName('title')[0];

    expect(iconTitle.innerHTML).toBe(editIconTitle);
  });

  let testComponent: Block | null = null;

  beforeEach(() => {
    testComponent = new SimpleElement({});
  });

  test('set attributes', () => {
    if (!testComponent) {
      return;
    }

    const testId = 'testId';

    testComponent.setAttributes({ id: testId });
    expect(testComponent.attributes?.id).toBe(testId);
  });

  test('set props', () => {
    if (!testComponent) {
      return;
    }

    const testText = 'abc';

    testComponent.setProps({ text: testText });
    expect(testComponent.props?.text).toBe(testText);
  });

  test('hide', () => {
    if (!testComponent) {
      return;
    }

    testComponent.hide();

    expect(testComponent.attributes?.className).toMatch(/hidden/);
  });

  test('show', () => {
    if (!testComponent) {
      return;
    }

    testComponent.hide();
    testComponent.show();

    expect(testComponent.attributes?.className).toEqual(
      (testComponent.attributes?.className || '').replace(/hidden/g, ''),
    );
  });

  test('show after several hiding', () => {
    if (!testComponent) {
      return;
    }

    testComponent.hide();
    testComponent.hide();
    testComponent.hide();
    testComponent.show();

    expect(testComponent.attributes?.className).toEqual(
      (testComponent.attributes?.className || '').replace(/hidden/g, ''),
    );
  });

  test('component did update was called', () => {
    if (!testComponent) {
      return;
    }

    testComponent.componentDidUpdate = jest.fn();

    testComponent.setProps({ text: 'asd' });
    expect(testComponent.componentDidUpdate).toHaveBeenCalled();
  });
});
