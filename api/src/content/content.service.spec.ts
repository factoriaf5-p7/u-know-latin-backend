import { Test, TestingModule } from '@nestjs/testing';
import { SchemaTypes } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ContentService } from './content.service';
import { Content } from '../schemas/content.schema';
import { CreateContentDto } from './dto/create-content.dto';

const contents = [
  {
    id: '124',
    title: 'AprendiendoCss',
    description: 'Aprenderas en pocos pasos todo lo relacionado a css',
    price: 10.99,
    created_at: new Date('2023-06-15'),
    update: new Date('2023-06-15'),
    category: 'CSS',
    dificulty: 1,
    sales: true,
    content: 'Lorem ipsum dolor sit amet...',
  },
];

describe('ContentService', () => {
  let service: ContentService;
  const mockContentModel = {
    find: jest.fn().mockReturnValue(Promise.resolve(contents)),
    createContent: jest
      .fn()
      .mockImplementation((createContentDto: CreateContentDto) => {
        const newContent = {
          _id: new SchemaTypes.ObjectId('2'),
          ...createContentDto,
        };
        contents.push(newContent);
        return Promise.resolve(newContent);
      }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: getModelToken(Content.name),
          useValue: mockContentModel,
        },
      ],
    })
      //.overrideProvider(ContentService)
      //.useValue(mockContentService)
      .compile();

    service = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll() should return the array "contents"', async () => {
    expect(await service.findAll()).toMatchObject(contents);
  });

  it('should create an content and return a content with and "{id: 1234}" ', async () => {
    const newContent = {
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
    };
    expect(await service.createContent(newContent, '1234')).toMatchObject({
      _id: expect.any(SchemaTypes.ObjectId),
    });
  });
});
