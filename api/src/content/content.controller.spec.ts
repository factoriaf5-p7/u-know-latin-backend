import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

const content = [
  {
    id: '1234',
    title: 'Aprendiendo Html',
    description: 'Aprenderas en pocos pasos todo lo relacionado a html',
    price: 10.99,
    created_at: new Date('2023-06-15'),
    update: new Date('2023-06-15'),
    category: 'HTML',
    dificulty: 1,
    sales: true,
    content: 'Lorem ipsum dolor sit amet...',
  },
];

describe('ContentController', () => {
  let controller: ContentController;
  const mockContentService = {
    findAll: jest.fn().mockImplementation(() => Promise.resolve({ content })),
    createContent: jest
      .fn()
      .mockImplementation((createContentDto: CreateContentDto) => {
        const newContent = {
          id: 1,
          created_at: new Date('2023-06-15'),
          ...createContentDto,
        };
        content.push(newContent as any);
        return Promise.resolve(newContent);
      }),
    update: jest
      .fn()
      .mockImplementation(
        (contentId: string, updateContentDto: UpdateContentDto) => {
          const updateContent = {
            id: contentId,
            ...updateContentDto,
          };
          const index = content.findIndex(
            (content) => content.id === contentId,
          );
          if (index !== -1) {
            return Promise.resolve(updateContent);
          } else {
            return Promise.resolve(null);
          }
        },
      ),
    delete: jest.fn().mockImplementation((contentId: string) => {
      const index = content.findIndex((content) => content.id);
      content.splice(index, 1);
      console.log(content[index], content);
      if (index !== -1) {
        return Promise.resolve(content[index]);
      } else {
        return Promise.resolve(null);
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [ContentService],
    })
      .overrideProvider(ContentService)
      .useValue(mockContentService)
      .compile();

    controller = module.get<ContentController>(ContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a content list', async () => {
    expect(await controller.findAll()).toMatchObject({ content });
  });

  it('should create a new content', async () => {
    const newContent = {
      id: '124',
      title: 'AprendiendoCss',
      description: 'Aprenderas en pocos pasos todo lo relacionado a css',
      price: 10.99,
      create_at: new Date('2023-06-15'),
      update: new Date('2023-06-15'),
      category: 'CSS',
      dificulty: 1,
      sales: true,
      created_at: new Date('2023-06-15'),
      content: 'Lorem ipsum dolor sit amet...',
    };
    expect(await controller.createContent('124', newContent)).toMatchObject({
      id: expect.any(String),
    });
  });

  it('should update a content', async () => {
    const contentId = '124';
    const updateContent: UpdateContentDto = { title: 'Update Title' };

    expect(await controller.update(contentId, updateContent)).toEqual({
      id: contentId,
      title: 'Update Title',
    });
  });

  it('should delete a content', async () => {
    const contentId = '124';

    expect(await controller.delete(contentId)).toEqual({
      id: expect.any(String),
    });
  });
});
