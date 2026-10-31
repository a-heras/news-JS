import './sources.css';
import type { Source, SourcesResponse } from '../../../types/news';

class Sources {
    public draw(data: SourcesResponse): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>(
            '#sourceItemTemp'
        );

        if (!sourceItemTemp) return;

        data.sources.forEach((item: Source) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const name = sourceClone.querySelector<HTMLElement>('.source__item-name');
            if (name) name.textContent = item.name;

            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
            if (sourceItem) sourceItem.setAttribute('data-source-id', item.id ?? '');

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector<HTMLElement>('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;