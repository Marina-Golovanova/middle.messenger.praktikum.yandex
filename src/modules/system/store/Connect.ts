import { IComponentProps, Indexed } from '@types';
import { isEqual } from '@utils/isEqual';
import { Block } from '../block';
import { store, StoreEvents } from './Store';

export const connect = (
  Component: typeof Block,
  mapStateToProps: (state: Indexed) => Indexed,
) => {
  return class extends Component {
    constructor(
      data: { tagName: string } & IComponentProps<
        Record<string, unknown>,
        Partial<HTMLElement>
      >,
    ) {
      super({ ...data, props: { ...mapStateToProps(store.getState()) } });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (this.props) {
          if (!isEqual(this.props, newState)) {
            this.setProps(newState);
          }
        } else {
          this.setProps(newState);
        }
      });
    }
  };
};
