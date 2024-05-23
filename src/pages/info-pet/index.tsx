import {useEffect, useState} from 'react';
import BackButton from 'components/back-button';
import Select, {Option} from 'components/select';
import Input from 'components/input';
import Button from 'components/button';
import useForm from 'hooks/form';
import ImageUpload from 'components/image-upload/image-upload';
import {validate} from 'utils/validate';
import useApi from 'hooks/api';
import {useLoading} from 'context/loadingContext';
import {ITag, TagList} from 'components/tag-list';
import {useToast} from 'hooks/use-toast';

const addPetValidations = {
  name: [validate.isEmpty()],
  description: [validate.isEmpty()],
  type: [validate.isEmpty()],
  owner: [validate.isEmpty()],
  phone: [validate.isEmpty()],
};

export function InfoPet() {
  const [form, onChangeForm] = useForm({
    validations: addPetValidations,
  });
  const [image, setImage] = useState<string | null>(null);
  const [tags, setTags] = useState<ITag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const {showLoading, hideLoading} = useLoading();
  const toast = useToast();
  const serviceTags = useApi('coreServer', 'GET', 'tags', {});
  const pets = useApi('coreServer', 'POST', 'pets/new', {});

  async function onAddPet() {
    if (image === '' || image === null) return toast.showErrorToast('É obrigatório adicionar uma imagem');
    const request = form.values;
    const type = (request['type'] as Option<string>).value;
    const pet = {
      name: request['name'] as string,
      description: request['description'] as string,
      owner: {
        phone: request['phone'] as string,
        name: request['owner'] as string,
      },
      status: 'L',
      type: type,
      img_url: image.replace('data:image/jpeg;base64,', ''),
      pet_tag_ids: selectedTags.filter((tag: string) => !tag.includes('newTag')),
      new_pet_tag: selectedTags.filter((tag: string) => tag.includes('newTag')).map((id: string) => id.split('-')[0]),
    };
    showLoading();
    const response = await pets.fetch({
      dynamicParams: pet,
    });
    if (response) {
      form.clear({});
      setImage('');
      setSelectedTags([]);
      toast.showSuccessToast('Pet cadastrado com sucesso!');
    }
    hideLoading();
  }

  useEffect(() => {
    (async () => {
      const response = await serviceTags.fetch({});
      if (response) setTags(response.data);
    })();
  }, []);

  function addTag(newTag: ITag) {
    setTags([...tags, newTag]);
  }

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col max-w-96">
        <BackButton onClick={() => (window.location.href = '/shelter-management')} />

        <h1 className="self-start mt-7 mb-4 text-lg font-semibold text-gray-700">Cadastrar Pet Perdido</h1>

        <ImageUpload className="my-4 w-full" placeholder="Adicionar foto" onChange={setImage} />
        <Input
          className="mt-2"
          placeholder="Nome do Animal"
          value={(form.getValue('name') as string) ?? ''}
          error={form.getError('name')}
          onChange={onChangeForm('name')}
        />
        <Input
          className="mt-4"
          placeholder="Descrição"
          value={(form.getValue('description') as string) ?? ''}
          error={form.getError('description')}
          onChange={onChangeForm('description')}
        />
        <Input
          className="mt-2"
          placeholder="Nome do Dono"
          value={(form.getValue('owner') as string) ?? ''}
          error={form.getError('owner')}
          onChange={onChangeForm('owner')}
        />
        <Input
          className="mt-2"
          placeholder="Telefone"
          value={(form.getValue('phone') as string) ?? ''}
          error={form.getError('phone')}
          onChange={onChangeForm('phone')}
        />
        <h2 className="mt-2">Tipo:</h2>
        <Select
          className="mt-2"
          options={[
            {value: 'D', label: 'Cachorro'},
            {value: 'C', label: 'Gato'},
          ]}
          value={form.getValue('type') as Option<string>}
          onChange={onChangeForm('type')}
          error={form.getError('type')}
        />

        <TagList addTag={addTag} selectedTags={selectedTags} setSelectedTags={setSelectedTags} tags={tags} />

        <Button className="mt-4" variant="secondary" label="Cadastrar Pet" onClick={form.trySave(onAddPet)} />
      </div>
    </div>
  );
}
