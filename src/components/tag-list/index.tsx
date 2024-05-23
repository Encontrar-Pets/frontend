import Input from 'components/input';
import Tag from 'components/tag';
import {useState} from 'react';

export interface ITag {
  id: string;
  description: string;
}

interface Props {
  tags: ITag[];
  setSelectedTags: (tags_ids: string[]) => void;
  selectedTags: string[];
  addTag: (tag: ITag) => void;
  isSearch?: boolean;
}

export function TagList(props: Props) {
  const [textInput, setTextInput] = useState('');
  return (
    <>
      <b className="mt-3 text-gray-700">Características</b>
      <span className="text-gray-500">Selecione as opções abaixo:</span>
      <div className="flex flex-row flex-wrap my-2">
        {props.tags.map((tag: {id: string; description: string}, index: number) => {
          if (!tag.id) return;
          return (
            <Tag
              id={tag.id}
              key={index + 1}
              description={tag.description}
              selected={props.selectedTags?.includes(tag.id)}
              onClick={() => {
                if (props.selectedTags.includes(tag.id)) {
                  props.setSelectedTags(props.selectedTags.filter((t: any) => t !== tag.id));
                  return;
                }
                props.setSelectedTags([...props.selectedTags, tag.id]);
              }}
            />
          );
        })}
      </div>

      <div className="flex flex-row mt-2">
        <Input
          className="mr-2"
          placeholder={props.isSearch ? 'Ou pesquise por uma nova' : 'Ou adicione uma nova'}
          value={textInput}
          onChange={(value) => {
            setTextInput(value);
          }}
        />
        <button
          disabled={textInput === ''}
          onClick={() => {
            if (textInput === '') return;
            props.addTag({
              id: `${textInput}-newTag-${props.tags.length + 1}`,
              description: textInput,
            });
            props.setSelectedTags([...props.selectedTags, `${textInput}-newTag-${props.tags.length + 1}`]);
            setTextInput('');
          }}
          className={`flex ${
            textInput === '' ? 'bg-primary-light' : 'bg-primary'
          } h-12 w-14 rounded-lg items-center justify-center`}
        >
          <span className="text-white text-[36px] mb-1">+</span>
        </button>
      </div>
    </>
  );
}
